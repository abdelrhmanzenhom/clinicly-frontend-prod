export const isActiveDoctor = (doctor, activeDoctor) => {
    return doctor?._id === activeDoctor?._id
}