const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Diya", "Isha", "Sanya", "Kriti", "Neha", "Priya", "Ananya", "Aarohi", "Riya"];
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Das", "Reddy", "Rao", "Jain", "Bose", "Verma", "Yadav", "Iyer", "Chauhan"];
const constituencies = ["New Delhi", "Mumbai South", "Bangalore Central", "Chennai North", "Kolkata Dakshin", "Ahmedabad West", "Pune", "Hyderabad", "Jaipur", "Lucknow"];
const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal", "Gujarat", "Rajasthan", "Uttar Pradesh", "Telangana"];

const generateMockUser = (epic) => {
  const fName = firstNames[randomInt(0, firstNames.length - 1)];
  const lName = lastNames[randomInt(0, lastNames.length - 1)];
  const age = randomInt(18, 85);
  const houseNo = randomInt(1, 999);
  const street = `Sector ${randomInt(1, 50)}`;
  const constituency = constituencies[randomInt(0, constituencies.length - 1)];
  const state = states[randomInt(0, states.length - 1)];
  
  return {
    epic: epic.toUpperCase(),
    name: `${fName} ${lName}`,
    age: age,
    gender: randomInt(0, 1) === 0 ? "Male" : "Female",
    address: `H.No ${houseNo}, ${street}, ${constituency}, ${state}`,
    constituency: constituency,
    pollingStation: `Govt. Primary School, Room No. ${randomInt(1, 10)}`,
    status: "Active (Registered)",
    avatar: "🦁"
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
