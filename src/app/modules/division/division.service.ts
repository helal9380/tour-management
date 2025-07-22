/** @format */

import httpStatus from "http-status-codes";
import AppEror from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
  const isExistingDivision = await Division.findOne({ name: payload.name });

  if (isExistingDivision) {
    throw new AppEror(httpStatus.BAD_REQUEST, "Division already exist!");
  }

  const division = await Division.create(payload);
  return division;
};

const getAllDivision = async () => {
  const division = await Division.find({});
  const totalDivisions = await Division.countDocuments();
  return {
    division,
    meta: {
      total: totalDivisions,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });

  if (!division) {
    throw new AppEror(httpStatus.BAD_REQUEST, "Division not found!");
  }
  return division;
};

const updateDivision = async (
  divisionId: string,
  payload: Partial<IDivision>
) => {
  const existDivision = await Division.findById(divisionId);

  if (!existDivision) {
    throw new AppEror(httpStatus.NOT_FOUND, "Division not found to update.");
  }

  const dublicateDivision = await Division.findById({
    name: payload.name,
    _id: { $ne: divisionId },
  });

  if (dublicateDivision) {
    throw new AppEror(httpStatus.BAD_REQUEST, "This division already exist!");
  }

  const updatedDivision = await Division.findByIdAndUpdate(
    divisionId,
    payload,
    { new: true, runValidators: true }
  );
  return updatedDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DiviionService = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
