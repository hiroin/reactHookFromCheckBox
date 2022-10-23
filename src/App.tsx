import React, { useState } from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function App() {
  const [submitData, setSubmitData] = useState<string>("");
  const defaultCheckedValues = ["B"];

  // Options
  const options = [
    {
      title: "A"
    },
    {
      title: "B"
    },
    {
      title: "C"
    },
    {
      title: "D"
    }
  ];
  const {
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit
  } = useForm<FieldValues>({
    criteriaMode: "all",
    defaultValues: { checkbox: defaultCheckedValues.join(",") }
  });

  const handleFormOnSubmit = (data: any) => {
    setSubmitData(data.checkbox);
  };

  const handleCheck = (
    option: { title: string },
    event: React.ChangeEvent<{}>
  ) => {
    let values: string[] = getValues("checkbox")?.split(",") || [];
    values = values.filter((v) => v); // 空要素削除

    let newValues: string[] = [];
    if ((event.target as HTMLInputElement).checked) {
      newValues = [...(values ?? []), option.title];
    } else {
      newValues = values?.filter((value) => value !== option.title);
    }
    setValue("checkbox", newValues.join(","));

    return newValues.join(",");
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(handleFormOnSubmit)}
        encType="multipart/form-data"
      >
        <FormControl
          required
          error={errors?.hasOwnProperty("checkbox")}
          component="fieldset"
          fullWidth
        >
          <FormLabel component="legend">質問</FormLabel>

          <FormHelperText>
            {errors?.checkbox && errors?.checkbox.message}
          </FormHelperText>

          <FormGroup>
            <Controller
              name="checkbox"
              control={control}
              rules={{ required: "選択してください。" }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <>
                  {options.map((option, i) => (
                    <FormControlLabel
                      {...field}
                      key={i}
                      label={option.title}
                      onChange={(event) =>
                        field.onChange(handleCheck(option, event))
                      }
                      control={
                        <Checkbox
                          defaultChecked={defaultCheckedValues.includes(
                            option.title
                          )}
                        />
                      }
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          送信
        </Button>
      </form>
      <br />
      送信内容
      <br />
      {submitData}
    </>
  );
}
