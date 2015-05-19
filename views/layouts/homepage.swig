{% extends "../layout.swig" %}

{% block content %}
  {% if user %}
  <img src="{{ user.profile_medium }}" style="width: 50px; height: 50px; border-radius: 50px; border: 2px solid lightgrey;">
  <div>Welcome {{ user.firstname }}</div>
  <ul>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/friends">Friends</a></li>
    <li><a href="/followers">Followers</a></li>
    <li><a href="/koms">KOMs</a></li>
    <li><a href="/stats">Stats</a></li>
    <li><a href="/activities">Activities</a></li>
    <li><a href="/friends_activities">Friends Activities</a></li>
  </ul>
  {% else %}
  <p>Please log in</p>
  {% endif %}
{% endblock content %}
