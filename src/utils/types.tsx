export type exerciseObject = {
    description: string;
    duration: number;
    id: number;
    photo: string;
    title: string;
    video: string;
};

export type objectInArrayWithExercises = {
    title: string;
    exercises: Array<exerciseObject>;
};
