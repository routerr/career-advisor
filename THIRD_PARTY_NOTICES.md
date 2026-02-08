# Third-Party Notices (Assessment Content + Resources)

This app includes an original assessment experience built from a mix of **original items** and **public-domain item banks**, plus references to well-known vocational/personality frameworks.

This document is not legal advice. If you reuse or redistribute this app, verify all licensing and attribution requirements for your use case.

## Questionnaire / Item Sources

### IPIP (International Personality Item Pool) Big Five Items

- Source: International Personality Item Pool (IPIP)  
  https://ipip.ori.org/
- License status: IPIP states that its items and scales are **public domain** and may be copied/edited/translated/used without permission or fees.
- How this project uses it:
  - Big Five items in `/Users/raychang/repo/career-advisor/src/data/questions.ts` are selected from commonly used IPIP Big Five items.
  - Chinese translations are provided by this project (not official IPIP translations).

### RIASEC (Holland) Interest Framework

- Framework: Holland’s RIASEC theory of vocational interests (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
- Reference implementations/tools: O*NET Interest Profiler and other O*NET Career Exploration tools.
- How this project uses it:
  - RIASEC items in `/Users/raychang/repo/career-advisor/src/data/questions.ts` are **originally written** to measure the RIASEC constructs.
  - This project does **not** copy the O*NET Interest Profiler items verbatim.

## O*NET References, Licenses, and Trademark Notes (If You Use O*NET Content)

This repository currently references O*NET resources as **background** and for definitions. If you later incorporate O*NET Career Exploration Tools content or O*NET data, follow the relevant O*NET licenses and attribution requirements.

Official references:
- O*NET Career Exploration Tools License: https://www.onetcenter.org/license_tools.html
- O*NET Resource Center Content License: https://www.onetcenter.org/license.html
- O*NET Web Services Content License: https://services.onetcenter.org/help/license
- O*NET trademark guidance is included in the above pages; display **O*NET®** properly and use “O*NET” as an adjective (e.g., “O*NET data”).

## Other Third-Party Code/Assets

This project uses open-source libraries (e.g., React, Recharts, lucide-react, html-to-image). Their licenses are distributed via npm packages and should be reviewed if you redistribute the app.

