import { SecurityThreat } from "../models/SecurityThreat.js";
import { User } from "../models/User.js";
import {SecurityEvent} from "~/models/SecurityEvent.js";

export const logedInFunctions = () => {
    const getUser = async () => {
        try {
          const response = await fetch("http://localhost:5079/api/users/getData", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`, // Pass the token
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          const user = new User(data);
          // Transform data into User instances if needed
          console.log(data);
          console.log(user);
          return  user;
        } catch (error) {
          console.error("Error during getting user data:", error);
          throw error;
        }
      };
      const getThreats = async () => {
        try {
            const response = await fetch("http://localhost:5079/api/threats/allThreats", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("AccessToken")}`, // Pass the token
              },
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            const threat = new SecurityThreat(data);
            console.log(data);
            console.log(threat);
            return  data.map(item => new threat(item));
          } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
          }
      }

    const getThreat = async (threatId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/threats/${threatId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`, // Pass the token
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }

      const postThreat = async (threatDetails) => {
        try {
            const response = await fetch("http://localhost:5079/api/threats/createThreat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
                body: JSON.stringify(threatDetails),
            });
    
            if (response.ok) {
                return { status: response.status, message: 'Threat successfully created' };
            } else {
                // Try to parse the response as JSON, if possible
                let errorDetails;
                try {
                    errorDetails = await response.json();
                } catch (jsonError) {
                    errorDetails = { message: 'Unknown error occurred' }; // Fallback if the response is not JSON
                }
                return { status: response.status, message: `Could not create a threat: ${errorDetails.message || 'Unknown error'}` };
            }
        } catch (error) {
            console.error('Error during creating a threat', error);
            throw error;
        }
    };
    const getEvents = async (threatId) => {
      try {
          const response = await fetch(`http://localhost:5079/api/threats/${threatId}/events/allEvents`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          const event = new SecurityEvent(data);
          console.log(data);
          console.log(event);
          return  data.map(item => new event(item));
        } catch (error) {
          console.error("Error during getting user data:", error);
          throw error;
        }
    }

    const postEvent = async (threatDetails, threatId) => {
      try {
          const response = await fetch(`http://localhost:5079/api/threats/${threatId}/events/createEvent`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
              },
              body: JSON.stringify(threatDetails),
          })
  
          if (response.ok) {
              return { status: response.status, message: 'Threat successfully created' };
          } else {
              // Try to parse the response as JSON, if possible
              let errorDetails;
              try {
                  errorDetails = await response.json();
              } catch (jsonError) {
                  errorDetails = { message: 'Unknown error occurred' }; // Fallback if the response is not JSON
              }
              return { status: response.status, message: `Could not create a threat: ${errorDetails.message || 'Unknown error'}` };
          }
      } catch (error) {
          console.error('Error during creating a threat', error);
          throw error;
      }
  };
      // Return an object containing the function
      return { getUser, getThreats, getThreat, postThreat, getEvents, postEvent };

}