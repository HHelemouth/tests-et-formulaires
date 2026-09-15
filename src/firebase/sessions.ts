import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { TestSession, TestResponse } from '../types';

const SESSIONS = 'sessions';
const RESPONSES = 'responses';

function toMillis(v: unknown): number {
  if (v instanceof Timestamp) return v.toMillis();
  if (typeof v === 'number') return v;
  return Date.now();
}

export async function createSession(params: {
  ownerId: string;
  ownerEmail: string;
  name: string;
  testTypeId: string;
  requireEmail: boolean;
}): Promise<string> {
  const ref = await addDoc(collection(db, SESSIONS), {
    ownerId: params.ownerId,
    ownerEmail: params.ownerEmail,
    name: params.name,
    testTypeId: params.testTypeId,
    status: 'open',
    requireEmail: params.requireEmail,
    responseCount: 0,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listSessionsForUser(ownerId: string): Promise<TestSession[]> {
  const q = query(collection(db, SESSIONS), where('ownerId', '==', ownerId));
  const snap = await getDocs(q);
  const sessions = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ownerId: data.ownerId,
      ownerEmail: data.ownerEmail,
      name: data.name,
      testTypeId: data.testTypeId,
      status: data.status,
      requireEmail: data.requireEmail,
      createdAt: toMillis(data.createdAt),
      closedAt: data.closedAt ? toMillis(data.closedAt) : undefined,
      responseCount: data.responseCount ?? 0,
    };
  });
  return sessions.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getSession(sessionId: string): Promise<TestSession | null> {
  const snap = await getDoc(doc(db, SESSIONS, sessionId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    ownerId: data.ownerId,
    ownerEmail: data.ownerEmail,
    name: data.name,
    testTypeId: data.testTypeId,
    status: data.status,
    requireEmail: data.requireEmail,
    createdAt: toMillis(data.createdAt),
    closedAt: data.closedAt ? toMillis(data.closedAt) : undefined,
    responseCount: data.responseCount ?? 0,
  };
}

export async function setSessionStatus(sessionId: string, status: 'open' | 'closed') {
  await updateDoc(doc(db, SESSIONS, sessionId), {
    status,
    ...(status === 'closed' ? { closedAt: serverTimestamp() } : {}),
  });
}

export async function submitResponse(params: {
  sessionId: string;
  participantName: string;
  participantRole: string;
  participantEmail?: string;
  answers: Record<string, number>;
}): Promise<void> {
  await addDoc(collection(db, RESPONSES), {
    sessionId: params.sessionId,
    participantName: params.participantName,
    participantRole: params.participantRole,
    participantEmail: params.participantEmail ?? null,
    answers: params.answers,
    submittedAt: serverTimestamp(),
  });
  await updateDoc(doc(db, SESSIONS, params.sessionId), {
    responseCount: increment(1),
  });
}

export async function listResponses(sessionId: string): Promise<TestResponse[]> {
  const q = query(collection(db, RESPONSES), where('sessionId', '==', sessionId));
  const snap = await getDocs(q);
  const responses = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      sessionId: data.sessionId,
      participantName: data.participantName,
      participantRole: data.participantRole,
      participantEmail: data.participantEmail ?? undefined,
      answers: data.answers,
      submittedAt: toMillis(data.submittedAt),
    };
  });
  return responses.sort((a, b) => a.submittedAt - b.submittedAt);
}
