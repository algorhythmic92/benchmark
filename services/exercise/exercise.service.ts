import { useCallback, useEffect, useState } from 'react';
import request from '../request/request.service';
import Exercise from '@/components/Exercise/interface/Exercise.interface';

type ApiResponse<T> = {
  data: T | null;
  message?: string;
};

const BASE_URL = 'http://localhost:8080/ws-benchmark/exercise';

export const useGetAllExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await request<Exercise[]>(BASE_URL, 'GET');
        console.log('data : ' + data);
        setExercises(data);
      } catch (err) {
        setError('Failed to fetch exercises');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { exercises, loading, error };
};

export const useGetExerciseById = (id: number) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await request<ApiResponse<Exercise>>(
          `${BASE_URL}/:id`,
          'GET',
          { pathParams: { id } },
          async (response) => {
            if (!response.ok) {
              return {
                data: null,
                message: `Exercise with ID ${id} not found`,
              };
            }
            const data = await response.json();
            return { data };
          }
        );
        if (response.data) {
          setExercise(response.data);
        } else {
          setError(response.message || 'Failed to fetch exercise');
        }
      } catch (err) {
        setError('Failed to fetch exercise');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { exercise, loading, error };
};

export const useCreateExercise = () => {
  const [createdExercise, setCreatedExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createExercise = useCallback(async (exercise: Exercise) => {
    setLoading(true);
    try {
      const data = await request<Exercise>(
        BASE_URL,
        'POST',
        { body: exercise },
        (response) => response.json()
      );
      setCreatedExercise(data);
    } catch (err) {
      setError('Failed to create exercise');
    } finally {
      setLoading(false);
    }
  }, []);

  return { createExercise, createdExercise, loading, error };
};

export const useUpdateExercise = (id: number) => {
  const [updatedExercise, setUpdatedExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateExercise = useCallback(
    async (exerciseDetails: Partial<Exercise>) => {
      setLoading(true);
      try {
        const response = await request<ApiResponse<Exercise>>(
          `${BASE_URL}/:id`,
          'PUT',
          { pathParams: { id }, body: exerciseDetails },
          async (response) => {
            if (!response.ok) {
              return {
                data: null,
                message: `Exercise with ID ${id} not found`,
              };
            }
            const data = await response.json();
            return { data };
          }
        );
        if (response.data) {
          setUpdatedExercise(response.data);
        } else {
          setError(response.message || 'Failed to update exercise');
        }
      } catch (err) {
        setError('Failed to update exercise');
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return { updateExercise, updatedExercise, loading, error };
};

export const useDeleteExercise = (id: number) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteExercise = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request<ApiResponse<null>>(
        `${BASE_URL}/:id`,
        'DELETE',
        { pathParams: { id } },
        async (response) => {
          if (!response.ok) {
            return { data: null, message: `Exercise with ID ${id} not found` };
          }
          return { data: null };
        }
      );
      if (response.data === null) {
        setDeleted(true);
      } else {
        setError(response.message || 'Failed to delete exercise');
      }
    } catch (err) {
      setError('Failed to delete exercise');
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { deleteExercise, deleted, loading, error };
};
