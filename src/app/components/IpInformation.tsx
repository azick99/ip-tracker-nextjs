type IpInfoProps = {
  title: string
  information: string
  noLine?: string
}
const IpInformation = ({ title, information, noLine }: IpInfoProps) => {
  return (
    <div className="information">
      <div>
        <p className="text-accent uppercase fs-400 text-medium">{title}</p>
        <p className="text-dark fs-500 text-medium">{information}</p>
      </div>
      <div className={noLine ? noLine : 'line'}></div>
    </div>
  )
}

export default IpInformation
