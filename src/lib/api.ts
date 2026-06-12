const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const FRAUDS_ENDPOINT = `${API_URL}/api/fraud`;

export interface Fraud {
  id: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
}

export interface NewFraud {
  impostorDetails: string;
  contactInfo: string;
  comments: string;
}

export async function createFraud(data: NewFraud): Promise<Fraud> {
  const response = await fetch(FRAUDS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = `Error ${response.status} al enviar el reporte.`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // cuerpo no era JSON
    }
    throw new Error(message);
  }

  return response.json();
}

export async function getFraudes(): Promise<Fraud[]> {
  const response = await fetch(FRAUDS_ENDPOINT, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar los reportes.`);
  }

  return response.json();
}