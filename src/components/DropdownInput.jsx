import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation, updateRoles } from '../redux/filterSlice';

export default function DropdownMultipleSearchSelection({ label, options, values }) {
  const dispatch = useDispatch()
  const selectedValues = useMemo(
    () => values?.filter((v) => v.value),
    [values],
  );
  return (
    <Box sx={{ pl: 2, pr: 2, pt: 2 }}>
      <Autocomplete
        value={selectedValues}
        size='small'
        multiple
        options={options}
        autoHighlight
        onChange={(event, values) => {
          if (label?.toLowerCase() === "roles") {
            dispatch(updateRoles(values))
          }
          else if (label?.toLowerCase() === "location") {
            dispatch(updateLocation(values))
          }
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps
            }}
          />
        )}
      />
    </Box>
  );
}
