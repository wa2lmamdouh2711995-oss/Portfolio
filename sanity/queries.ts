export const projectsQuery = `*[_type == "project"] | order(date desc) {
  _id,
  title,
  slug,
  coverImage,
  category,
  date,
  description
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  gallery,
  category,
  date,
  description
}`;

export const aboutQuery = `*[_type == "about"][0] {
  _id,
  bio,
  skillsText,
  profileImage
}`;

export const experienceQuery = `*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  duration,
  type,
  order
}`;

export const skillsQuery = `*[_type == "skills"][0] {
  _id,
  items
}`;

export const softwareQuery = `*[_type == "software"] | order(name asc) {
  _id,
  name,
  icon,
  proficiency
}`;

export const educationQuery = `*[_type == "education"] | order(order asc) {
  _id,
  university,
  degree,
  year,
  order
}`;
