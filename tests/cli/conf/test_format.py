from enum import Enum
import re
from hypothesis import given
import hypothesis.strategies as st

from zentra_models.cli.utils.format import (
    list_to_str,
    name_from_camel_case,
    name_to_camel_case,
    name_to_plural,
    set_colour,
)


class Action(Enum):
    ADD = ("+", "green")


# Hypothesis strategy for valid text and colour inputs
text_strategy = st.text(min_size=1, max_size=50)
colour_strategy = st.sampled_from(["red", "green", "blue", "yellow"])


@given(
    st.text(
        alphabet=st.characters(whitelist_categories=("Lu", "Ll", "Nd")), min_size=10
    )
)
def test_name_from_camel_case(input_string):
    result = name_from_camel_case(input_string)

    expected_result = re.sub("([a-z0-9])([A-Z])", r"\1-\2", input_string).lower()
    assert result == expected_result


@given(
    st.text(
        alphabet=st.characters(whitelist_categories=("Ll", "Pd")),
        min_size=1,
        max_size=100,
    )
)
def test_name_to_camel_case(name):
    result = name_to_camel_case(name)
    expected_result = "".join(word.title() for word in name.split("-"))
    assert isinstance(result, str)
    assert result == expected_result


@given(text=text_strategy, colour=colour_strategy)
def test_set_colour(text, colour):
    result = set_colour(text, colour)
    assert result.startswith(f"[{colour}]")
    assert result.endswith(f"[/{colour}]")
    assert text in result


@given(
    name=st.text(min_size=1, max_size=20), count=st.integers(min_value=0, max_value=100)
)
def test_name_to_plural(name, count):
    result = name_to_plural(name, count)
    if count == 1:
        assert result == name
    else:
        assert result == f"{name}s"


def test_list_to_str():
    items = ["button", "alert", "avatar"]
    action = Action.ADD

    result = list_to_str(items, action)
    target = "  [green]+[/green] alert, avatar, button"
    assert result == target
