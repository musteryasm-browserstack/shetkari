"use server"

import { pool } from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function login(body: { username: string, password: string }) {
    try {
        const { username, password } = body;

        if (!username || !password) {
            throw new Error("Invalid credentials");
        }
        const results = await getUserByUsername(username);

        if (!results) {
            throw new Error("User with this username does not exist");
        }
        const comparePassword = bcrypt.compareSync(password, results.el_password);

        if (!comparePassword) {
            throw new Error("Incorrect Password");
        }

        const user = {
            id: results.el_em_id,
            username: results.el_username,
            name: results.el_name,
            role: results.el_role,
            token: jwt.sign(
                {
                    id: results.el_em_id,
                    username: results.el_username,
                    name: results.el_name,
                    role: results.el_role
                },
                process.env.JWT_SECRET as string,
                { expiresIn: "1d" }
            )
        };
        if (comparePassword) {
            return { type: "success", message: "User logged in successfully", sessionDetails: user }
        }
        throw new Error("bcrypt is not working")
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return { type: "error", message: error.message, sessionDetails: null }
        } else {
            return { type: "error", message: error as string, sessionDetails: null }
        }
    }
}

export const getUserByUsername = async (username: string) => {
    const query = `
        SELECT *
        FROM employee_login
        WHERE el_username = '${username}' AND el_active = true;
    `;
    try {
        const { rows } = await pool.query(query);
        console.log(rows);
        if (rows) {
            return rows[0];
        } else {
            return null;
        }
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const getUserDetailsFromUsername = async (employeeId: number) => {
    try {
        const query = `
            SELECT 
                em.em_id,
                em.em_email,
                em.em_name,
                em.em_fname,
                em.em_mname,
                em.em_lname,
                em.em_mobile,
                em.em_landline,
                em.em_subscribe_mobile,
                em.em_address_line1 AS local_address_line1,
                em.em_address_line2 AS local_address_line2,
                em.em_address_line3 AS local_address_line3,
                sm_local.sm_state AS local_state,
                em.em_local_city AS local_city,
                sm_permanent.sm_state AS permanent_state,
                em.em_permanent_city AS permanent_city,
                em.em_contact_person,
                em.em_contact_no,
                em.em_gully,
                em.em_area,
                em.em_birth_date,
                em.em_join_date,
                em.em_designation,
                em.em_company,
                em.em_gender,
                em.em_marital_status,
                em.em_spouse_name,
                em.em_blood_group,
                em.em_qualification,
                em.em_skills,
                em.em_notice_period,
                em.em_reporting_to,
                em.em_deactivation_date,
                em.em_pro_employee
            FROM 
                employee_master em
            LEFT JOIN 
                state_master sm_local ON em.em_local_state_id = sm_local.sm_id
            LEFT JOIN 
                state_master sm_permanent ON em.em_permanent_state_id = sm_permanent.sm_id
            WHERE 
                em.em_id = $1; -- Replace ? with the employee ID you want to fetch
        `;
        const { rows } = await pool.query(query, [employeeId]);
        console.log(rows);
        if (rows) {
            return rows[0];
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}