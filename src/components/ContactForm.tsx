import type { ContactInfo } from '../types';

interface Props {
  contact: ContactInfo;
  onChange: (c: ContactInfo) => void;
}

export default function ContactForm({ contact, onChange }: Props) {
  const update = (field: keyof ContactInfo, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <div className="res-section contact-form-section">
      <h3>Datos de contacto</h3>
      <div className="rs-sub">Completa tus datos para recibir el diagnóstico completo y agendar una sesión de profundización.</div>

      <div className="row2">
        <div className="field">
          <label>Nombre completo <span className="req">*</span></label>
          <input value={contact.name} onChange={e => update('name', e.target.value)} placeholder="Tu nombre" />
        </div>
        <div className="field">
          <label>Email <span className="req">*</span></label>
          <input type="email" value={contact.email} onChange={e => update('email', e.target.value)} placeholder="tu@email.com" />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label>Teléfono</label>
          <input type="tel" value={contact.phone} onChange={e => update('phone', e.target.value)} placeholder="+56 9 1234 5678" />
        </div>
        <div className="field">
          <label>Mensaje adicional</label>
          <textarea value={contact.message} onChange={e => update('message', e.target.value)} placeholder="¿Algún comentario o pregunta adicional?" />
        </div>
      </div>
    </div>
  );
}
