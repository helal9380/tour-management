/** @format */

import httpStatus from "http-status-codes";
import AppEror from "../../errorHelpers/appError";
import { ITour } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: Partial<ITour>) => {
  const existTour = await TourType.findOne({ title: payload.title });
  if (existTour) {
    throw new AppEror(httpStatus.BAD_REQUEST, "The title is already exist!");
  }
  const tour = await TourType.create(payload);
  return tour;
};
const getAllTourType = async () => {
  const tour = await TourType.find({});
  return tour;
};
const updateTourType = async (tourId: string, payload: Partial<ITour>) => {
  const existTour = await TourType.findById(tourId);
  if (!existTour) {
    throw new AppEror(httpStatus.BAD_REQUEST, "Tour type not found!");
  }

  const updatedTourTypes = await TourType.findByIdAndUpdate(tourId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedTourTypes;
};

const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

// all tour types api
const getAllTours = async () => {
  const tour = await TourType.find({});
  return tour;
};
const createTour = async (payload: Partial<ITour>) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error("A tour with this title already exists.");
  }
  const tour = await Tour.create(payload);
  return tour;
};
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);
  if (!existingTour) {
    throw new Error("Tour not found!.");
  }
  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};
const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

export const TourService = {
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
};
