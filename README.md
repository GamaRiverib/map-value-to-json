# map-value-to-json
Helper function for converting a MapValue object to a JSON object. The events trigger by Firestore in Google Cloud Functions serve the documents using the MapValue type.
```javascript
const { mapValueToJson } = require("@gamariverib/map-value-to-json");

const event = {
  value: {
    fields: {
      createdAt: {
        timestampValue: "2021-12-02T22:39:52.472Z",
      },
      id: {
        stringValue: "test.user",
      },
      preferences: {
        mapValue: {
          fields: {
            lang: {
              stringValue: "us",
            },
          },
        },
      },
      profile: {
        mapValue: {
          fields: {
            name: {
              stringValue: "John Doe",
            },
            photo: {
              stringValue: "https://facebook.com/photo",
            },
          },
        },
      },
      updatedAt: {
        timestampValue: "2021-12-02T22:45:22.341Z",
      },
      email: {
        stringValue: "john.doe@gmail.com",
      },
      lastname: {
        stringValue: "Doe",
      },
      name: {
        stringValue: "John",
      },
      phone: {
        stringValue: "+11234567890",
      },
      roles: {
        arrayValue: {
          values: [
            {
              stringValue: "admin",
            },
            {
              stringValue: "creator",
            },
          ],
        },
      },
    },
  },
  name: "projects/test/databases/(default)/documents/user-accounts/MVThbkz6gNcK2HZAzH3r",
};

/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
 const helloFirestore = (event, context) => {
  const json = mapValueToJson(event);
  console.log(JSON.stringify(json, null, 2));
};

helloFirestore(event, undefined);

```
