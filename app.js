const express = require("express");
const { Builder } = require("selenium-webdriver");

const app = express();
app.use(express.json());

// Function to perform automation
// Function to perform automation
async function automate(url) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the specified URL
    await driver.get(url);

    // Wait for a bit to ensure all the console logs are captured
    await driver.sleep(10000);

    // Retrieve logs from the browser console
    const logs = await driver.manage().logs().get("browser");

    // Filter logs to find the one containing 'ttMeta'
    // const logWithMeta = logs.find(log => log.message.includes('ttMETA'));

    const logWithMeta = await driver.executeScript(() => {
      return ttMETA;
    });
    console.log(logWithMeta, "metaaaaaaaaaaaaaaaaaaaaa");
    if (logWithMeta) {
      if (logWithMeta) {
        return logWithMeta
        // Extract 'ttMeta' value from the log message
      }else {
        return null; // 'ttMeta' not found in logs
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  } finally {
    await driver.quit();
  }
}

// Test Routes

app.get('/test', (req, res) => {
  res.send('API is Working Properly')
})
// Endpoint to trigger the automation
app.post("/trigger-automation", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const ttMetaValue = await automate(url);
    if (ttMetaValue !== null) {
      res.json({ ttMetaValue });
    } else {
      res.status(404).json({ error: "ttMeta not found in console logs" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while automating" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
