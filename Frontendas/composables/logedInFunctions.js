import { SecurityThreat } from "../models/SecurityThreat.js";
import { User } from "../models/User.js";
import {SecurityEvent} from "~/models/SecurityEvent.js";
import {Badge} from "~/models/Badge.js";

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

    const getBadges = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/users/user/${userId}/badges`, {
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
            return  data.map(item => new Badge(item));
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
          const events = data.map(item => new SecurityEvent(item));
          console.log(data);
          return  events
        } catch (error) {
          console.error("Error during getting user data:", error);
          throw error;
        }
    }

    const postEvent = async (threatDetails) => {
      try {
          var threatId = parseInt(localStorage.getItem("threatId"), 10);

          const response = await fetch(`http://localhost:5079/api/threats/${threatId}/events/createEvent`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
              },
              body: JSON.stringify(threatDetails),
          })
  
          if (response.ok) {
              return { status: response.status, message: 'Event successfully created' };
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
    const getLeaderboard = async () => {
        try {
            const response = await fetch(`http://localhost:5079/api/users/leaderboard`, {
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
            const users = data.map(item => new User(item));
            console.log(users);
            return users;
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    };
    const getVotesOnThreats = async (threatId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/threat/${threatId}`, {
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
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }
    const getVotesOnEvents = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/event/${eventId}`, {
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
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }
    const voteThreat = async (threatId, upvote) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/threat/${threatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
                body: JSON.stringify(upvote),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }
    const voteEvent = async (eventId, upvote) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/event/${eventId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
                body: JSON.stringify(upvote),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }
    const downvoteThreat = async (threatId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/threat/${threatId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }
    const downvoteEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5079/api/vote/event/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error("Error during getting user data:", error);
            throw error;
        }
    }

      // Return an object containing the function
      return { getUser, getThreats, getThreat, postThreat, getEvents, postEvent, getLeaderboard, getBadges, getVotesOnThreats, getVotesOnEvents, voteThreat, voteEvent, downvoteThreat, downvoteEvent };

}