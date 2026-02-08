# Assessment Sources (RIASEC + Big Five + Work Values)

This project’s assessment is designed for **career exploration** (not diagnosis). It combines:

- **RIASEC**: vocational interest themes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)
- **Big Five (OCEAN)**: broad personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- **Work values**: a short, practical set used to steer job-search decisions (Autonomy, Stability, Growth, Impact)

## Academic / Authoritative References

### RIASEC
- O*NET Resource Center: **O*NET Interest Profiler** overview (RIASEC interest structure; mentions Holland).  
  https://www.onetcenter.org/IP.html
- O*NET (official): examples of interest-code browsing by RIASEC codes.  
  https://www.onetonline.org/explore/interests/
- O*NET starter score report (plain-language definitions for the six RIASEC themes).  
  https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report_Starter.pdf

### Big Five (OCEAN)
- Oxford “Mind & Behaviour Research Group”: overview and definitions of the Big Five; cites **John & Srivastava (1999)**.  
  https://mbrg.bsg.ox.ac.uk/big-five
- Open textbook chapter describing OCEAN traits.  
  https://openbooks.library.baylor.edu/psych1305/chapter/ch-10-personality/

### Big Five Item Bank (Public Domain)
- IPIP (International Personality Item Pool) official site.  
  The site states the items and scales are **public domain** and may be copied/edited/translated.  
  https://ipip.ori.org/

## Implementation Notes

- The Big Five items in `src/data/questions.ts` are selected from commonly used IPIP items (public domain).
- The RIASEC items in `src/data/questions.ts` are **custom-written** to match the RIASEC constructs and keep the survey compact and bilingual-friendly.
- The score display is normalized to **0–100** for consistent charting across different scales.

## Translation Notes

- Each item is written first as a clear, natural statement, then translated with the same intent (not word-for-word).
- Some Big Five items are reverse-keyed; the Chinese wording is kept consistent with the English polarity.

