from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, Optional, NumberRange, URL, AnyOf


class AddCupcakeForm(FlaskForm):
    """Form for adding pets."""

    flavor = StringField("Flavor", validators=[InputRequired(message="Enter a flavor")])
    size = StringField("Size", validators=[InputRequired(message="Enter a size"), AnyOf(values=["small", "medium", "large"], message="What size cupcake? Choose: small, medium, or large")])
    rating = FloatField("Rating", validators=[InputRequired(), NumberRange(min=0, max=10, message="Enter a rating between 0 and 10")])
    image = StringField("Cupcake Image URL", validators=[Optional(), URL(require_tld=True, message="Not a valid URL")])
