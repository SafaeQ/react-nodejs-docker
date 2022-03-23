import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [result, setResult] = useState("");
  useEffect(async () => {
    const response = await fetch("http://localhost/admin/profile", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (response.status !== 401) {
      console.log("admin", response);
      setResult(result.output);
    } else {
      const response2 = await fetch("http://localhost/owner/profile", {
        method: "GET",
        credentials: "include",
      });
      const result2 = await response2.json();
      if (response2.ok !== 401) {
        console.log("owner", response2);
        setResult(result2.output);
      } else {
        const response3 = await fetch("http://localhost/customer/profile", {
          method: "GET",
          credentials: "include",
        });
        const result3 = await response3.json();
        if (response3.ok !== 401) {
          console.log("customer", response3);
          setResult(result3.output);
        } else {
          console.log("som");
        }
      }
    }
  }, []);
  return (
    <div>
      <h1>{result}</h1>
    </div>
  );
};

export default ProfilePage;
