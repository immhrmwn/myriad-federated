import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";

import { useStyles } from ".";

import { debounce } from "lodash";

const SearchBox = ({
  color = "primary",
  ariaLabel = "search-box",
  placeholder = "Search",
  outlined = false,
  onSubmit,
  iconPosition = "start",
  hidden = false,
  ...props
}) => {
  const classes = useStyles({ outlined, hidden });

  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const submitClickSearch = () => {
    const debouncedSubmit = debounce(() => {
      if (onSubmit) {
        onSubmit(input);
      }
    }, 500);

    debouncedSubmit();
  };

  const submitSearch = (event) => {
    if (event.key === "Enter") {
      const debouncedSubmit = debounce(() => {
        if (onSubmit) {
          onSubmit(input);
        }
      }, 500);

      debouncedSubmit();
    }
  };

  return (
    <Grid
      container
      direction={iconPosition === "end" ? "row-reverse" : "row"}
      className={classes.root}
      component={Paper}
      elevation={iconPosition === "end" ? 0 : 1}
    >
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={submitClickSearch}
      >
        <SvgIcon component={SearchIcon} viewBox="0 0 24 24" />
      </IconButton>
      <InputBase
        onKeyUp={submitSearch}
        className={classes.input}
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        inputProps={{ "aria-label": ariaLabel }}
        {...props}
      />
    </Grid>
  );
};

export default SearchBox;
