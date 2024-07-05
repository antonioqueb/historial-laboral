'use client';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Button } from '../ui/button';
import { FaTrash, FaSave } from 'react-icons/fa';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 20,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
  },
});

interface Empleado {
  nombre: string;
  curp: string;
  rfc: string;
  nss: string;
}

interface Props {
  empleado: Empleado;
  codigo: string;
}

const SignaturePad: React.FC<Props> = ({ empleado, codigo }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [signatureURL, setSignatureURL] = useState<string | null>(null);

  const handleClear = () => {
    sigCanvas.current?.clear();
    setSignatureURL(null);
  };

  const handleSaveSignature = async () => {
    if (sigCanvas.current) {
      const url = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      setSignatureURL(url);
      await handleGenerateAndUploadPDF(url);
    }
  };

  const handleGenerateAndUploadPDF = async (signatureURL: string) => {
    if (!signatureURL) return;

    const MyDocument = (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.header}>Contrato de Aceptación de Condiciones</Text>
          <Text style={[styles.subheader, { fontStyle: 'italic' }]}>
            El presente contrato establece los términos y condiciones entre el empleador y el empleado.
          </Text>
          <View style={styles.section}>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Código del contrato:</Text> {codigo}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Nombre del Empleado:</Text> {empleado.nombre}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>CURP:</Text> {empleado.curp}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>RFC:</Text> {empleado.rfc}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>NSS:</Text> {empleado.nss}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Términos y Condiciones</Text>
            <Text style={styles.text}>1. El empleado se compromete a cumplir con todas las políticas y procedimientos de la empresa.</Text>
            <Text style={styles.text}>2. La empresa se reserva el derecho de modificar los términos y condiciones del contrato con previo aviso al empleado.</Text>
            <Text style={styles.text}>3. El empleado acepta que toda la información proporcionada es verídica y está actualizada.</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Autorización para el Uso de Datos</Text>
            <Text style={styles.text}>
              El empleado autoriza a la empresa a utilizar sus datos personales con el fin de cumplir con las obligaciones laborales y para cualquier otro propósito relacionado con la administración del personal.
              Esto incluye, pero no se limita a, el procesamiento de nómina, beneficios, y evaluaciones de desempeño.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Opinión de la Empresa sobre el Empleado</Text>
            <Text style={styles.text}>
              La empresa considera que {empleado.nombre} es un activo valioso para el equipo. Su dedicación y profesionalismo han sido evidentes en todas sus tareas y responsabilidades.
              Confiamos en que su contribución seguirá siendo esencial para el éxito de nuestra organización.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Firma</Text>
            <Text style={styles.text}>Al firmar este documento, el empleado acepta todos los términos y condiciones establecidos en este contrato.</Text>
            <View style={styles.signature}>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Firma del Empleado:</Text></Text>
              <Image src={signatureURL} style={{ width: '100%', height: 'auto' }} />
              <Text style={styles.text}>{empleado.nombre}</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Firma del Representante de la Empresa:</Text></Text>
              <Text>_____________________________</Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(MyDocument).toBlob();
    saveAs(blob, 'Contrato_Firmado.pdf');
    await uploadPDF(blob);
  };

  const uploadPDF = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'Contrato_Firmado.pdf');
    formData.append('nss', empleado.nss);

    try {
      const response = await fetch('https://upload-file-by-nss.historiallaboral.com/upload-signature', {
        method: 'POST',
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*', // Solo para pruebas locales; en producción debe ser configurado en el servidor
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Archivo PDF subido exitosamente:', result);
      } else {
        console.error('Error al subir el archivo PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <div className='gap-4 flex-row flex'>
        <Button onClick={handleClear} variant="secondary">
          <FaTrash className="mr-2 h-4 w-4" /> Limpiar Firma
        </Button>
        <Button onClick={handleSaveSignature} variant="secondary">
          <FaSave className="mr-2 h-4 w-4" /> Guardar Firma
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
