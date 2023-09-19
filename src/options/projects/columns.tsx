// "use client"

// import { ColumnDef } from "@tanstack/react-table"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Project = any


"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type Project = {
  SlNo: Number,
  ProjectID: string;
  ProjectTitle: string;
  ProjectTitle2: string;
  LanguageUsed: string;
  projectDescription: string;
  projectDescription2: string;
  lang1: string;
  ResearchAreaDescription: string;
  ResearchAreaDescription2: string;
  ProjectDescription: string;
  ProjectDescription2: string;
  StudentRoles: string;
  StudentRoles2: string;
  StudentSkills: string;
  StudentSkills2: string;
  StartDate: string; // You might want to use a Date type here depending on your use case
  isStartDateFlexible: boolean;
  NotesOnStartDate: string;
  City: string;
  Province: string;
  PreferredBackgroundCollection: string;
  InternshipQ1: string;
  InternshipQ2: string;
  InternshipQ3: string;
  InternshipQ4: string;
  InternshipQ5: string;
  InternshipQ6: string;
  InternshipQ7: string;
  InternshipQ8: string;
  InternshipQ9: string;
  InternshipQ10: string;
  InternshipQ11: string;
  InternshipQ12: string;
  InternshipQ13: string;
  InternshipQ14: string;
  InternshipQ15: string;
  InternshipQ16: string;
  Professor: {
    FirstName: string;
    LastName: string;
    FacultyProvince: string;
    UniversityName: string;
    CampusName: string;
    UniversityID: string;
    // Add more properties as needed
  };
};


export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
