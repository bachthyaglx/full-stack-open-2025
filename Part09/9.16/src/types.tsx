interface CoursePartBase {
    name: string;
    exerciseCount: number;
    kind: string;
}
  
// New interface that shares `description`
interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}
  
interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic";
}
  
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}
  
interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background";
}
  
interface CoursePartSpecial extends CoursePartWithDescription {
    requirements: string[];
    kind: "special";
}
  
export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;
  