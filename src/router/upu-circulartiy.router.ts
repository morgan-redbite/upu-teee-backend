import { Router } from "express";
import { BookingServices } from "../services/UPU";

const UPUCircularityRouter = Router();

UPUCircularityRouter.get("/", async (req, res) => {
  try {
    res.send("Nothing to see here");
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


// require interface BookingCollection
UPUCircularityRouter.post("/book", async (req, res) => {
    try {
			if (!req.body) {
					res.status(400).json({ error: "Booking data is required" });
					return;
			}
      // assume body has exactly the BookingInput shape
      const booking = await BookingServices(req.body);

      res.json({
        message: "Success",
        data: booking
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message || error.toString()
      });
    }
  });

export default UPUCircularityRouter;