export type SensorDataType = {
    data_id: number;
    sensor_id: string;
    timestamp: string;
    moisture: number;
    temperature: number;
    ph: number;
};

export type FirebaseDataType = {
    deviceid: string;
    humidity: number;
    latitude: number;
    longitude: number;
    moisture: number;
    ph: number;
    pump: number;
    temperature: number;
    ultrasonic: number;
};