import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient | undefined>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryFormValues, id: string) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error?.response) {
        throw new Error("No response from server");
      }
      throw new Error(error.response.data);
    }
    throw Error("Not axios error")
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getById, create, createEntry,
};

