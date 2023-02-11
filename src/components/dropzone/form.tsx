import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { DropzonePicture } from ".";

export function DropzoneForm() {
  return(
    <Formik initialValues={{ files: [] }} onSubmit={() => {}}>
      {
        ({ values, errors }) => (
          <Form>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
            </Grid>
            <DropzonePicture name="files" />
            <pre>
              {JSON.stringify({ values, errors}, null, 2)}
            </pre>
          </Form>
        )
      }
    </Formik>
  )
}