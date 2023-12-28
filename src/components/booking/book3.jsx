import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";

const FinalBook = () => {
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [additionService, setAdditionService] = useState([]);
  const [reserService, setReserService] = useState([]);
  const auth = useContext(AuthContext);
  const book = useContext(BookContext);
  const qrCodeRef = useRef(null);

  const getAddtionService = () => {
    instance
      .get("AdditionalServices", {
        params: {
          userTypeId: auth.userTypeId ? auth.userTypeId : 1,
        },
      })
      .then((res) => {
        setAdditionService(res?.data?.data);
        setReserService(
          res?.data?.data?.map((erv) => {
            return {
              description: erv.description,
              id: erv.id,
              name: erv.name,
              pricePerAdult: erv.pricePerAdult,
              pricePerChild: erv.pricePerChild,
              count: 0,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  };

  useEffect(() => {
    getAddtionService();
  }, []);

  useEffect(() => {
    setQRCodeValue(
      `Date: ${book?.bookingDate}\nAdults: ${book?.numberOfAdults}\nChildren: ${
        book?.numberOfChild
      }\n${book?.additionalServices
        ?.map((serv) => {
          const matchingService = additionService.find(
            (servs) => servs?.id === serv?.serviceId
          );
          if (matchingService) {
            return `${matchingService.name} count: ${1}`;
          }
          return null;
        })
        .filter(Boolean)
        .join("\n")}`
    );
  }, [book, additionService]);

  const handleDownloadQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const qrImage = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(qrImage, "PNG", 10, 50, 400, 60);
      pdf.save("qr_code.pdf");
    });
  };

  return (
    <div>
      {/* Your existing JSX code */}
      <div className="text-center mt-5">
        <div ref={qrCodeRef}>
          <QRCode value={qrCodeValue} size={200} />
        </div>
      </div>
      {/* Rest of your JSX code */}
    </div>
  );
};

export default FinalBook;
