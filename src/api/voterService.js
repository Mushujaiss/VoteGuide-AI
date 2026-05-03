const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maleFirstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya"];
const femaleFirstNames = ["Diya", "Isha", "Sanya", "Kriti", "Neha", "Priya", "Ananya", "Aarohi", "Riya", "Myra"];
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Das", "Reddy", "Rao", "Jain", "Bose", "Verma", "Yadav", "Iyer", "Chauhan"];

const locationData = [
  { state: "Delhi", constituency: "New Delhi", district: "New Delhi District" },
  { state: "Maharashtra", constituency: "Mumbai South", district: "Mumbai City" },
  { state: "Karnataka", constituency: "Bangalore Central", district: "Bengaluru Urban" },
  { state: "Tamil Nadu", constituency: "Chennai North", district: "Chennai" },
  { state: "West Bengal", constituency: "Kolkata Dakshin", district: "Kolkata" },
  { state: "Uttar Pradesh", constituency: "Lucknow North", district: "Lucknow" },
  { state: "Gujarat", constituency: "Ahmedabad West", district: "Ahmedabad" },
  { state: "Telangana", constituency: "Hyderabad Central", district: "Hyderabad" }
];

const generateMockUser = (epic) => {
  const gender = randomInt(0, 1) === 0 ? "Male" : "Female";
  const nameList = gender === "Male" ? maleFirstNames : femaleFirstNames;
  const fName = nameList[randomInt(0, nameList.length - 1)];
  const lName = lastNames[randomInt(0, lastNames.length - 1)];
  
  const loc = locationData[randomInt(0, locationData.length - 1)];
  const age = randomInt(18, 85);
  const houseNo = randomInt(1, 999);
  const street = `Sector ${randomInt(1, 50)}, ${loc.district}`;
  
  return {
    epic: epic.toUpperCase(),
    name: `${fName} ${lName}`,
    age: age,
    gender: gender,
    address: `H.No ${houseNo}, ${street}, ${loc.state}`,
    constituency: loc.constituency,
    state: loc.state,
    pollingStation: `Govt. Primary School, Room No. ${randomInt(1, 10)}`,
    status: "Active (Registered)",
    avatar: gender === "Male" ? "👨" : "👩"
  };
};

export const voterService = {
  lookupVoter: async (epicNumber) => {
    await delay(1500);
    const epic = epicNumber.trim().toUpperCase();
    
    if (epic.length >= 8) {
      // Dynamically generate a valid user for ANY 8+ character string
      const user = generateMockUser(epic);
      return { success: true, data: user };
    } else {
      return { success: false, error: "Please enter a valid EPIC number (at least 8 characters)." };
    }
  },

  loginUser: async (phone, otp) => {
    await delay(1000);
    if (phone.length >= 10 && otp.length === 6) {
      return { success: true, token: "mock_jwt_token_123", profile: generateMockUser("IND" + phone.substring(0, 7)) };
    }
    return { success: false, error: "Invalid credentials" };
  }
};
