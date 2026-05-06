import Intake from "../models/intake.models.js";
import sendToExternalApi from "../service/externalApi.service.js";
import asyncHandler from "../utils/asynchandler.js";
import intakeValidationSchema from "../validation/intake.validation.js";
import { sanitizeInput } from "../utils/sanitize.js";

const createIntake = asyncHandler(async (req, res) => {

    // Parse Jotform rawRequest
    const rawRequest = req.body?.rawRequest;
    let jotformData = req.body;
    if (typeof rawRequest === "string") {

        try {

            jotformData = JSON.parse(rawRequest);

        } catch (error) {

            console.error(
                "Failed to parse rawRequest:",
                error.message
            );

        }

    }

    // Extract Full Name
    const fullNameParts = jotformData?.q1_name || {};
    const fullName = [
        fullNameParts.first,
        fullNameParts.last
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    // Sanitized + Transformed Data
    const sanitizedData = {

        fullName: sanitizeInput(
            fullName || jotformData?.fullName || ""
        ),

        email: sanitizeInput(
            jotformData?.q2_email ||
            jotformData?.email ||
            ""
        ),

        phone: sanitizeInput(
            jotformData?.q3_phoneNumber?.full ||
            jotformData?.phone ||
            ""
        ),

        serviceType: sanitizeInput(
            jotformData?.q5_serviceType ||
            jotformData?.serviceType ||
            ""
        ),

        budget: sanitizeInput(
            jotformData?.q7_budget ||
            jotformData?.budget ||
            ""
        ),

        projectDescription: sanitizeInput(
            jotformData?.q8_projectDescription ||
            jotformData?.projectDescription ||
            ""
        )

    };

    // Validate Required Fields
    const { error } = intakeValidationSchema.validate(sanitizedData);
    if (error) {
        return res.status(400).json({
            success: false,
            message:
                "Validation error: " + error.details[0].message
        });
    }

    // Store in MongoDB
    const intake = await Intake.create(sanitizedData);

    console.log("MongoDB Saved Data:");
    console.log(intake);

    // Send To External API
    const externalApiResponse =
        await sendToExternalApi(sanitizedData);

    console.log("External API Response:");
    console.log(externalApiResponse);

    res.status(201).json({

        success: true,

        message: "Intake created successfully",

        data: intake,

        externalApiResponse

    });

});

export default createIntake;