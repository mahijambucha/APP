# APP

## Track completion and certificates

Successful interactive Code challenges and completed AI lesson quizzes are saved in browser storage. Completing every interactive lesson configured for a track creates one persistent certificate record for that skill. The record is available to future UI through `window.TechScaleCertificates.getCertificate(trackId)`; new completion notifications use the `techscale:certificate-generated` window event. No certificate display or download UI is included yet.

These records are stored client-side and are not independently verifiable credentials. Tech Basics does not issue a certificate until it has interactive lessons and completion checks.
