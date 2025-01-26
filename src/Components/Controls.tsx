import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); // Extend dayjs with the UTC plugin

const Controls = ({ setScheduleTime }) => {
  return (
    <div className="bg-[#3D52A0] h-[calc(100vh-64px)] w-72 p-4">
      {/* Heading */}
      <h5 className="text-white mb-4">
        Select the Date and Time for the emails to send:
      </h5>

      <div className="flex justify-center items-center">
        <Space direction="vertical">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(value) => {
              if (value) {
                // Ensure `value` is treated as a dayjs instance
                const utcTime = value.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
                console.log("Selected UTC Date & Time:", utcTime);
                setScheduleTime(utcTime); // Pass the UTC time to setScheduleTime
              } else {
                console.log("No Date Selected");
              }
            }}
            style={{ width: 250 }}
          />
        </Space>
      </div>
    </div>
  );
};

export default Controls;
