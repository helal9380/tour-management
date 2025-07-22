/** @format */

import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourService } from "./tour.service";

const createTourType = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.createTourType(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: tour,
  });
});
const getAllTourType = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.getAllTourType();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All tour types retrieved successfully",
    data: tour,
  });
});
const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const tourId = req.params.id;
  const updatedTour = await TourService.updateTourType(tourId, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All tour retrieved successfully",
    data: updatedTour,
  });
});
const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const tourId = req.params.id;
  await TourService.deleteTourType(tourId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour type deleted successfully",
    data: null,
  });
});

// all tour api
const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.getAllTours();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All tour retrieved successfully",
    data: tour,
  });
});
const createTour = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.createTour(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create tour successfully",
    data: tour,
  });
});
const updateTour = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.updateTour(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Updated tour successfully",
    data: tour,
  });
});
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const tour = await TourService.deleteTour(req.params.id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Deleted tour successfully",
    data: tour,
  });
});

export const TourController = {
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
};
