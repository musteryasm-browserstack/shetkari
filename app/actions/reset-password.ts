"use server"

import { pool } from "@/db";
import sendMail from "@/lib/email";
import bcrypt from "bcryptjs";


export const getOTP = async (em_id: number) => {
    try {
        const email = await getEmailByEmployeeId(em_id);

        console.log(email);

        if (email) {
            const value = Math.floor(100000 + Math.random() * 900000);
            console.log(value);

            await sendMail(email.em_email, "Otp for verification",
                `Here is your OTP : ${value}`)

            return { type: "success", message: "OTP sent successfully", value: value }
        }

        return { type: "error", message: "Error generating OTP" };
    }
    catch (error) {
        console.log(error);
        return { type: "error", message: "Error generating OTP" };
    }
}

export const resetPassword = async (em_id: number, password: string) => {
    try {
        const query = `
            UPDATE employee_login
            SET el_password = $1
            WHERE el_em_id = $2
            RETURNING *;
        `;

        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);

        const { rows } = await pool.query(query, [hashedPass, em_id]);

        if (rows.length > 0) {
            return { type: "success", message: "Password updated successfully" };
        }
        return { type: "error", message: "Something went wrong" };

    } catch (e) {
        console.error("Error resetting password:", e);
        return { type: "error", message: "Something went wrong" };
    }
};

const getEmailByEmployeeId = async (em_id: number) => {
    try {
        const querry = `
            SELECT 
                em_email
            FROM 
                employee_master
            WHERE
                em_id = ${em_id};
        `
        const { rows } = await pool.query(querry)

        return rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
}