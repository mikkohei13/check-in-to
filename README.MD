Check-in-to
====================

User id logic:
- Frontend:
    - Generate random id with PHP.
    - If user has an id on localstorage, use that. Else use the random id.
    - If localstorage is not available, use empty string.
- Backend:
    - If userid is given, save that.
    - Is userid is empty, use IP address prepended with "IP-" as the userid
    - Check that user has not checked in too short time ago. If not, check in with the userid.
    - Always return place data, together with information about the check-in.
   
Current setup:
- Development
    - App: Turso
    - API: biomi.org
    - DB: biomi.org
- Production
    - App: biomi.org
    - API: creativitygrowing
    - DB: creativitygrowing

TODO
----

MUST:

SHOULD/NICE:
- Analyze sub-location data

SOMEDAY/MAYBE:

- Local happenings
- Don't log checkin if location is not close to the place (+-3 km?)
- Tracking code to track several plaques on single location (to QRcode) -> data on wether people use QRcode or write URL by hand, know where to place the plaque 
- Bird atlas data
- Observations grouped by taxon group?
- UI to edit places (Distributed, Google Docs? Validation required.)
- Automatic plaque generation (jpg, png?, 300dpi)

NOTES
-----

Design ideas:
- http://www.awwwards.com/30-recent-inspirational-ui-examples-in-mobile-device-screens.html
- http://www.otherfocus.com/web-design-inspiration-1/
- http://gorohov.name/

Fonts:
- Merriweather
- Lato


