/**
 * UTM Tracker — Fonseca & Miranda
 * 
 * Captura UTMs da URL, persiste no sessionStorage,
 * e disponibiliza para formulários e futuros webhooks.
 */

// Parâmetros rastreados
const UTM_PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'fbclid',     // Facebook Click ID
    'gclid',      // Google Click ID
    'ref',        // Referência genérica
] as const;

const STORAGE_KEY = 'fm_utm_data';
const EVENTS_KEY = 'fm_utm_events';

export interface UTMData {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    utm_id?: string;
    fbclid?: string;
    gclid?: string;
    ref?: string;
    landing_page: string;
    referrer: string;
    captured_at: string;
}

export interface UTMEvent {
    event: string;
    timestamp: string;
    page: string;
    utm: UTMData;
    data?: Record<string, string>;
}

/**
 * Captura UTMs da URL atual e persiste no sessionStorage.
 * Chamado uma vez no carregamento do App.
 */
export function captureUTMs(): UTMData {
    // Se já têm UTMs salvos e a URL atual não tem novos, manter os existentes
    const existing = getStoredUTMs();
    const params = new URLSearchParams(window.location.search);

    const hasNewUTMs = UTM_PARAMS.some(key => params.has(key));

    if (!hasNewUTMs && existing) {
        return existing;
    }

    const utmData: UTMData = {
        landing_page: window.location.pathname + window.location.search,
        referrer: document.referrer || '(direct)',
        captured_at: new Date().toISOString(),
    };

    for (const key of UTM_PARAMS) {
        const value = params.get(key);
        if (value) {
            (utmData as unknown as Record<string, string>)[key] = value;
        }
    }

    // Persistir (sessionStorage = dura a sessão do browser)
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
    } catch {
        // fallback silencioso em caso de Storage cheio
    }

    return utmData;
}

/**
 * Recupera UTMs armazenados na sessão.
 */
export function getStoredUTMs(): UTMData | null {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/**
 * Registra um evento com dados UTM para futura consulta/webhook.
 * 
 * Exemplo de uso:
 *   trackUTMEvent('whatsapp_form_submit', { name: 'João', area: 'Previdenciário' });
 *   trackUTMEvent('page_view', { page: '/advogado-previdenciario-manaus' });
 */
export function trackUTMEvent(event: string, data?: Record<string, string>): UTMEvent {
    const utm = getStoredUTMs();
    const eventObj: UTMEvent = {
        event,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        utm: utm || {
            landing_page: window.location.pathname,
            referrer: '(unknown)',
            captured_at: new Date().toISOString(),
        },
        data,
    };

    // Armazenar no sessionStorage (lista de eventos)
    try {
        const rawEvents = sessionStorage.getItem(EVENTS_KEY);
        const events: UTMEvent[] = rawEvents ? JSON.parse(rawEvents) : [];
        events.push(eventObj);
        // Manter máximo de 50 eventos por sessão
        if (events.length > 50) events.shift();
        sessionStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch {
        // fallback silencioso
    }

    // Log no console para debug (pode ser removido em produção)
    if (typeof window !== 'undefined' && (window as unknown as Record<string, boolean>).__FM_UTM_DEBUG__) {
        console.log('[UTM Event]', eventObj);
    }

    return eventObj;
}

/**
 * Recupera todos os eventos UTM rastreados na sessão.
 */
export function getUTMEvents(): UTMEvent[] {
    try {
        const raw = sessionStorage.getItem(EVENTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * Envia dados UTM para webhook externo.
 * Pronto para ser ativado quando o webhook for configurado.
 * 
 * Exemplo:
 *   sendToWebhook('https://hooks.zapier.com/xxx', eventObj);
 */
export async function sendToWebhook(webhookUrl: string, event: UTMEvent): Promise<boolean> {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Ativa modo debug no console.
 * Uso: window.__FM_UTM_DEBUG__ = true
 */
export function enableDebug(): void {
    (window as unknown as Record<string, boolean>).__FM_UTM_DEBUG__ = true;
    console.log('[UTM] Debug mode enabled. All events will be logged.');
    console.log('[UTM] Current UTMs:', getStoredUTMs());
    console.log('[UTM] Events:', getUTMEvents());
}
