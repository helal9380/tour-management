/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { DiviionService } from "./division.service";

const createDivision = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const division = await DiviionService.createDivision(req.body);

  sendResponse(res, {
    success: true,
    message: "Division is created successfully",
    data: division,
    statusCode: httpStatus.CREATED,
  });
};
const getAllDivision = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const result = await DiviionService.getAllDivision();

  sendResponse(res, {
    success: true,
    message: "Divisions retrieved successfully.",
    data: result.division,
    meta: result.meta,
    statusCode: httpStatus.OK,
  });
};
const getSingleDivision = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const slug = req.params.slug;
  const division = await DiviionService.getSingleDivision(slug);

  sendResponse(res, {
    success: true,
    message: "Single division retrieved successfully.",
    data: division,
    statusCode: httpStatus.OK,
  });
};
const updateDivision = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const divisionId = req.params.id;

  const updatedDivision = await DiviionService.updateDivision(
    divisionId,
    req.body
  );

  sendResponse(res, {
    success: true,
    message: "Division updated successfully.",
    data: updatedDivision,
    statusCode: httpStatus.OK,
  });
};
const deleteDivision = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const divisionId = req.params.id;

  await DiviionService.deleteDivision(divisionId);

  sendResponse(res, {
    success: true,
    message: "Division deleted successfully.",
    data: null,
    statusCode: httpStatus.OK,
  });
};

export const DivisionContorller = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
