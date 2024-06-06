export default interface Exercise {
  name: string;
  variation: string;
  personalRecord: {
    reps: number;
    weight: number;
  };
  dateAchieved: string;
}
