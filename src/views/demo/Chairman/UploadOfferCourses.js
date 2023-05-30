import React from 'react'
import { Table } from 'components/ui'
import {Alert , Switcher} from 'components/ui'
const { Tr, Th, Td, THead, TBody } = Table

const UploadOfferCourses = () => {
    return (
        <div>
            <Alert className="mb-4" type="info" showIcon>
            المساقات التي سوف تطرح على الفصل الدراسي   </Alert>
            <Table>
                <THead>
                    <Tr>
                        <Th>Course name:</Th>
                        <Th>Status</Th>
                       
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Software Design </Td>
                        <Td> <div className="mb-4">
                <Switcher defaultChecked color="green-500" />
            </div></Td>
                    </Tr>
             
                </TBody>
            </Table>
        </div>
    )
}

export default UploadOfferCourses