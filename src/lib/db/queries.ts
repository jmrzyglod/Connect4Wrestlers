import { PrismaClient } from "@prisma/client";
import { Wrestler, WrestlerGroup, DailyWrestlers } from "@prisma/client";

const prisma = new PrismaClient();

const disconnectPrisma = async () => {
    await prisma.$disconnect();
}

const catchPrismaErrors = async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}

export async function createWrestler(wrestler_name: string, image_url: string): Promise<void | Wrestler> {
    const wrestler = await prisma.wrestler.create({
        data: {
            name: wrestler_name,
            image: image_url
        }
    })
        .then((data) => { disconnectPrisma(); return data; })
        .catch((e) => catchPrismaErrors(e));

    return wrestler;
};

export const createWrestlersGroup = async (
    name: string,
    wrestler_1: Wrestler,
    wrestler_2: Wrestler,
    wrestler_3: Wrestler,
    wrestler_4: Wrestler) => {
    const wrestlersGroup = await prisma.wrestlerGroup.create({
        data: {
            name: name,
            wrestler_1_id: wrestler_1.id,
            wrestler_2_id: wrestler_2.id,
            wrestler_3_id: wrestler_3.id,
            wrestler_4_id: wrestler_4.id
        }
    })
        .then((data) => { disconnectPrisma(); return data; })
        .catch((e) => catchPrismaErrors(e));

    return wrestlersGroup;
}

export async function createSchedule(wrestlersGroup: WrestlerGroup, start: Date, end: Date): Promise<DailyWrestlers | void> {
    const dailySchedule = await prisma.dailyWrestlers.create({
        data: {
            wrestler_group_id: wrestlersGroup.id,
            starting_at: start,
            ending_at: end
        }
    })
        .then(() => disconnectPrisma())
        .catch((e) => catchPrismaErrors(e));
}

export async function getWrestlers(): Promise<Wrestler[]> {
    return await prisma.wrestler.findMany();
}

export async function getWrestlerById(id: number): Promise<Wrestler | null> {
    return await prisma.wrestler.findUnique({where: {id: id}});
}

export async function getWrestlerGroups(): Promise<WrestlerGroup[]> {
    return await prisma.wrestlerGroup.findMany();
}

export async function getWrestlerGroupById(id: number): Promise<WrestlerGroup | null> {
    return await prisma.wrestlerGroup.findUnique({where: {id: id}});
}

export async function getAllScheduled(): Promise<DailyWrestlers[]> {
    return await prisma.dailyWrestlers.findMany();
}

export async function getSpecificSchedules(start: Date | null = null, end: Date | null = null): Promise<DailyWrestlers[]> {
    let queue = {};

    if (start) {
        queue = {starting_at: {gt: start}};
    }
    if (end) {
        queue = {...queue, ending_at: {lt: end}};
    }
    
    return await prisma.dailyWrestlers.findMany({
        where: queue
    });
}

export async function getCurrentSchedules(): Promise<DailyWrestlers[]> {
    const currentDate = new Date(Date.now());
    return await prisma.dailyWrestlers.findMany({
        where: {
            starting_at: {lt: currentDate},
            ending_at: {gt: currentDate}
        }
    });
}

export default {
    createWrestler: createWrestler,
    createWrestlersGroup: createWrestlersGroup,
    createSchedule: createSchedule,
    getWrestlers: getWrestlers,
    getWrestlerById: getWrestlerById,
    getWrestlerGroups: getWrestlerGroups,
    getWrestlerGroupById: getWrestlerGroupById,
    getAllScheduled: getAllScheduled,
    getSpecificSchedules: getSpecificSchedules,
    getCurrentSchedules: getCurrentSchedules
}
