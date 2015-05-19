ACCOUNT BAR
{% if user %}
  <a href="/logout">Log Out</a>
{% else %}
  <a href="/login">Log In</a>
{% endif %}
