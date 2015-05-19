{% extends "../layout.swig" %}

{% block content %}
  <div><img src="{{ user.profile }}" alt=""></div>
  <div>ID: {{ user.id }}</div>
  <div>First Name: {{ user.firstname }}</div>
  <div>Last Name: {{ user.lastname }}</div>
  <div>City: {{ user.city }}</div>
  <div>State: {{ user.state }}</div>
  <div>Country: {{ user.country }}</div>
  <div>Sex: {{ user.sex }}</div>
{% endblock content %}
