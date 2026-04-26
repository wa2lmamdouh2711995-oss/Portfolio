import { type SchemaTypeDefinition } from "sanity";

export const project: SchemaTypeDefinition = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] },
    { name: "category", title: "Category", type: "string" },
    { name: "date", title: "Date", type: "date" },
    { name: "description", title: "Description", type: "text" },
  ],
};

export const about: SchemaTypeDefinition = {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    { name: "bio", title: "Bio", type: "text" },
    { name: "skillsText", title: "Skills Summary", type: "text" },
    { name: "profileImage", title: "Profile Image", type: "image", options: { hotspot: true } },
  ],
};

export const experience: SchemaTypeDefinition = {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    { name: "company", title: "Company", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "type", title: "Type", type: "string" },
    { name: "order", title: "Order index", type: "number" },
  ],
};

export const skills: SchemaTypeDefinition = {
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    { name: "items", title: "Skill Items", type: "array", of: [{ type: "string" }] },
  ],
};

export const software: SchemaTypeDefinition = {
  name: "software",
  title: "Software",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "icon", title: "Icon", type: "image" },
    { name: "proficiency", title: "Proficiency", type: "string" },
  ],
};

export const education: SchemaTypeDefinition = {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    { name: "university", title: "University", type: "string" },
    { name: "degree", title: "Degree", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "order", title: "Order index", type: "number" },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about, experience, skills, software, education],
};
