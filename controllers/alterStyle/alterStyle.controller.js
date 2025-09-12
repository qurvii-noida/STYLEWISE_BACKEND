const AlterStyle = require("../../modals/alterStyle/alterStyle.model.js");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const addAlterStyle = async (req, res, next) => {
    try {
        const { payload, picklist_id } = req.body;
        if (payload?.length === 0 || !Array.isArray(payload)) {
            return next(new ApiError(400, "Payload must be non-empty array"));
        }

        const existingPicklistId = await AlterStyle.findOne({ pick_list_id: picklist_id });
        if (existingPicklistId) return next(new ApiError(400, "Picklist record already saved"));

        const createdAlterStyle = await AlterStyle.insertMany(payload);
        return res.status(201).json(new ApiResponse(201, "Alter style saved successfully", createdAlterStyle));

    } catch (error) {
        next(new ApiError(500, `Internal Server Error ${error}`))
    }
}
//  ****************** alter style list **************************
const getAlterStylesList = async (_, res, next) => {
    try {
        const alterStylesList = await AlterStyle.find();
        if (alterStylesList.length === 0) {
            return next(new ApiError(404, "Alter list not found"));
        }
        res.status(200).json(new ApiResponse(200, `${alterStylesList.length} alter styles fetched successfully.`, alterStylesList));
    } catch (error) {
        next(new ApiError(500, `Internal server error :: ${error}`));
    }
}

// ********************* get alter style list by pick_list_id ****************************
const getAlterStylesByPicklist_Id = async (req, res, next) => {
    try {
        const picklist_ids = req.body;

        if (!Array.isArray(picklist_ids) || picklist_ids.length === 0) {
            return next(new ApiError(400, "Payload must be a non-empty array"));
        }

        const alterList = await AlterStyle.find({
            pick_list_id: { $in: picklist_ids }
        });

        if (alterList.length === 0) {
            return next(new ApiError(404, "Alter list not found"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, `${alterList.length} styles fetched successfully.`, alterList));

    } catch (error) {
        next(new ApiError(500, `Internal server error :: ${error.message}`));
    }
};

// ***************************** update status *********************************************
const updateStatus = async (req, res, next) => {
    try {
        const { picklist_id, status } = req.body;

        if (!Array.isArray(picklist_id) || picklist_id.length === 0 || !status) {
            return next(new ApiError(400, "picklist_id must be a non-empty array and status is required"));
        }

        const updatedData = await AlterStyle.updateMany(
            { pick_list_id: { $in: picklist_id } },
            { $set: { status } },
            { new: true }
        );

        if (updatedData.modifiedCount === 0) {
            return next(new ApiError(404, "No records found for given picklist_id(s)"));
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                `${updatedData.modifiedCount} record(s) updated successfully`,
                updatedData
            )
        );

    } catch (error) {
        next(new ApiError(500, `Internal server error :: ${error.message}`));
    }
};



module.exports = { addAlterStyle, getAlterStylesList, getAlterStylesByPicklist_Id, updateStatus }