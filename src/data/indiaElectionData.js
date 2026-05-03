export const electionData = {
  registrationSteps: [
    { title: "Eligibility", desc: "Must be an Indian citizen and 18+ years old as of Jan 1st of the election year." },
    { title: "Fill Form 6", desc: "Available online via NVSP portal or Voter Helpline App." },
    { title: "Required Documents", desc: "Identity Proof (Aadhaar/PAN) and Address Proof (Electricity bill/Passport)." },
    { title: "Verification", desc: "Booth Level Officer (BLO) visits your home to verify details." },
    { title: "Voter ID Issued", desc: "EPIC (Electors Photo Identity Card) is generated and delivered." }
  ],
  votingSteps: [
    { title: "Go to Polling Booth", desc: "Visit your assigned polling station on election day." },
    { title: "Identity Verification", desc: "Show your EPIC or another valid government-issued ID." },
    { title: "Finger Ink Mark", desc: "An indelible ink mark is applied to your left index finger." },
    { title: "Use EVM", desc: "Press the button next to your chosen candidate. Wait for the beep." },
    { title: "VVPAT Confirmation", desc: "Check the VVPAT slip to confirm your vote was recorded correctly." }
  ],
  chatBotKnowledge: [
    { keywords: ["register", "form 6", "nvsp"], answer: "To register as a new voter in India, you need to fill out Form 6. You can do this online on the NVSP (National Voter's Service Portal) or via the Voter Helpline App." },
    { keywords: ["documents", "proof", "aadhaar", "pan"], answer: "You will need an Identity Proof (like Aadhaar card, PAN card, or Passport) and an Address Proof (like a recent electricity bill, ration card, or passport)." },
    { keywords: ["blo", "verification"], answer: "After you submit Form 6, a Booth Level Officer (BLO) will be assigned to visit your residential address to verify your identity and documents physically." },
    { keywords: ["evm", "machine", "how to vote"], answer: "At the polling booth, you will use an EVM (Electronic Voting Machine). Simply press the blue button next to the name and symbol of the candidate you wish to vote for. You will hear a beep sound." },
    { keywords: ["vvpat", "slip"], answer: "VVPAT stands for Voter Verifiable Paper Audit Trail. After you press the EVM button, a printed slip will be visible behind a glass window for 7 seconds so you can verify your vote was cast correctly." },
    { keywords: ["epic", "voter id", "card"], answer: "EPIC stands for Electors Photo Identity Card, commonly known as a Voter ID card. It is issued by the Election Commission of India after your registration is verified." },
    { keywords: ["hello", "hi", "help"], answer: "Namaste! I am VoteGuide AI, your guide to the Indian election process. You can ask me how to register, what Form 6 is, or how to use an EVM!" }
  ],
  fallbackAnswer: "I am still learning about the Indian electoral system! Try asking me about 'Form 6', 'EVMs', 'VVPAT', or the 'documents required for registration'."
};

// Mock Database for API
export const mockVotersDB = [
  { epic: "IND1234567", name: "Rahul Sharma", age: 24, constituency: "New Delhi", pollingStation: "Booth No. 45, Govt School", status: "Active" },
  { epic: "IND9876543", name: "Priya Patel", age: 31, constituency: "Ahmedabad West", pollingStation: "Booth No. 12, Community Hall", status: "Active" },
  { epic: "TEST000000", name: "Test User", age: 19, constituency: "Mumbai South", pollingStation: "Booth No. 101, City College", status: "Pending Verification" }
];
