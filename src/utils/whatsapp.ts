export function getWhatsAppUrl(phone: string, message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function generateCarInquiryMessage(carName: string, travelDate?: string) {
  let message = `Hello Harshada Tours and Travels,\n\nI am interested in renting the *${carName}* car.`
  if (travelDate) {
    message += `\nPlanned Travel Date: ${travelDate}`
  }
  message += `\n\nPlease provide me with more details and availability.`
  return message
}
