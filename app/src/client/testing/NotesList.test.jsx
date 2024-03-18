import { test, expect } from "vitest";
import { screen } from "@testing-library/react";

import { mockServer, renderInContext } from "wasp/client/test";
import { getTasks } from "wasp/client/operations";
import NotesList from "../components/NotesList";


const { mockQuery } = mockServer();

const mockNotes = [
  {
    id: 1,
    content: "test note 1",
    isImportant: true,
  },
];

test("handles mock data", async () => {

  renderInContext(<Todo />);

  await screen.findByText("test todo 1");

  expect(screen.getByRole("checkbox")).toBeChecked();

  screen.debug();
});