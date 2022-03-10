import React, { useEffect, useState } from 'react'
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from 'components/layout';
import Head from 'next/head'
import LayoutSidebar from 'components/layout-sidebar';

import RegistrationList from 'components/registration-list';
import ClassesList from 'components/classes-list';
import UpcomingClassesList from 'components/upcoming-classes-list';
import { useUser } from 'lib/swr';
import { MdModeEdit as EditIcon } from 'react-icons/md'

import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { BsExclamationCircle as WarningIcon } from 'react-icons/bs'


import {
  InputField,
  Select,
  TimezoneSelect,
  PhoneInput,
  Form
} from 'components/form'
 

export default function AccountSettings(props) {
  const router = useRouter();
  const { data: session } = useSession()
  const { user, isError, isLoading } = useUser(session?.user?.email)
  
  const [editMode, setEditMode] = useState(false)
  const [formError, setFormError] = useState(undefined)


  const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name"),
    // email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    timezone: yup.string().required("Please select a timezone")
  })

  const { 
    watch, 
    register, 
    control, 
    handleSubmit, 
    reset, 
    getValues,
    unregister,
    setValue,
    formState: { errors, isDirty, isValid } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user ? user.name : '',
      // email: user ? user.email : '',
      phone: user ? user.phone : '',
      city: user ? user.city : '',
      country: user ? user.country: '',
      timezone: user ? user.timezone : '',
      id: user ? user._id : '',
    },
    resolver: yupResolver(schema),
  })

  
  const { dirtyFields } = useFormState({
    control
  });

  useEffect(() => {
    if(!isLoading && user) reset({
      name: user ? user.name : '',
      // email: user ? user.email : '',
      phone: user ? user.phone : '',
      city: user ? user.city : '',
      country: user ? user.country: '',
      timezone: user ? user.timezone : '',
      id: user ? user._id : '',
    })
  }, [user])

  const onSubmit = async ({ email, name, phone, city, country, timezone, id }) => {
    if(name !== user.name || phone !== user.phone || city !== user.city || country !== user.country || timezone !== user.timezone) {
      try {
        const res = await fetch('/api/user/edit', {
          method: 'PUT',
          body: JSON.stringify({ email, name, phone, city, country, timezone, id}),
          type: 'application/json'
        })
        const resData = await res.json()
        user = resData.user
      } catch (err) {
        setFormError('Sorry, we couldn\t update your account. Try again later.')
        console.log("ERROR!", err)
      }  
    }
    setEditMode(false)
  }

  if(session) {
    return (
      <>
        <Layout hideNav={true}>
          <Head>
            <title>Account Settings | Amelio Language Institute</title>
          </Head>
          <LayoutSidebar>

            <div className="p-page pb-48 py-16 flex flex-col gap-y-48 bg-grey-100 min-h-screen">
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Couldn't load user data</div>
              ) : (
                <Form 
                  className='flex-1 flex flex-col gap-y-8'
                  onSubmit={handleSubmit(onSubmit)}
                  name="edit-account-settings"
                  register={register}
                >
                  <input
                    name={'id'}
                    value={user._id}
                    {...register('id')}
                    className='hidden'
                  />
                  {formError && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'><WarningIcon className='w-4 h-4 mr-2'/>{formError}</p>}
                  <div className='rounded-lg border border-grey-400 p-8 bg-white'>

                    <div className='flex flex-col gap-12'>
                      <div className='flex items-center gap-4'>
                        <h1 className='font-heading text-lg font-bold text-primary'>Account details</h1>
                        <div className='flex-1 flex justify-end'>
                          <button 
                            onClick={(e) => {
                              e.preventDefault()
                              setEditMode(!editMode)
                            }}
                            className='flex items-center p-3 rounded font-heading font-bold text-sm text-grey-800 bg-grey-400 hover:bg-grey-500 hover:text-grey-900 transition-colors duration-75'
                          >
                            {!editMode ? (<>Edit <EditIcon className='ml-1 w-4 h-4 fill-grey-700'/></>) : 'Cancel'}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className='rounded-lg border border-grey-400 p-8 bg-white'>
                    <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                      <h3 className='font-heading font-bold text-grey-600'>Personal info</h3>
                    </div>
                    <table className='table-auto w-full'>
                      <tbody className='rounded-lg overflow-hidden divide-y divide-grey-300'>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">Name:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.name}
                              </>
                            ) : (
                              <InputField
                                name="name"
                                placeholder="Your name" 
                                id="name"
                                type="text"
                                error={errors?.name}
                                hideError={true}
                                register={register}
                                isDirty={dirtyFields?.name || getValues('name')}
                              />
                            )}
                          </td>
                        </tr>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">Email:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.email}
                              </>
                            ) : (
                              <>
                                {user.email}
                              </>
                              // <InputField
                              //   name="email"
                              //   placeholder="you@email.com" 
                              //   id="email"
                              //   type="text"
                              //   error={errors?.email}
                              //   hideError={true}
                              //   register={register}
                              //   isDirty={dirtyFields?.email || getValues('email')}
                              // />
                            )}
                          </td>
                        </tr>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">Phone:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.phone ? `+${user.phone}` : ''}
                              </>
                            ) : (
                              // <InputField
                              //   name="phone"
                              //   placeholder="555-5555" 
                              //   id="phone"
                              //   type="text"
                              //   error={errors?.phone}
                              //   hideError={true}
                              //   register={register}
                              //   isDirty={dirtyFields?.phone || getValues('phone')}
                              // />
                              <PhoneInput
                                label="Phone:"
                                id="phone"
                                name="phone"
                                error={errors?.phone}
                                register={register}
                                control={control}
                                disabled={!editMode}
                                isDirty={dirtyFields.phone || getValues('phone')}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  
                  <div className='rounded-lg border border-grey-400 p-8 bg-white'>
                    <div className='flex-1 flex pb-4 justify-start border-b border-grey-300'>
                      <h3 className='font-heading font-bold text-grey-600'>Location info</h3>
                    </div>
                    <table className='table-auto w-full'>
                      <tbody className='rounded-lg overflow-hidden divide-y divide-grey-300'>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">City:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.city}
                              </>
                            ) : (
                              <InputField
                                name="city"
                                placeholder="Enter your city" 
                                id="city"
                                type="text"
                                error={errors?.city}
                                hideError={true}
                                register={register}
                                isDirty={dirtyFields?.city || getValues('city')}
                              />
                            )}
                          </td>
                        </tr>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">Country:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.country}
                              </>
                            ) : (
                              <InputField
                                name="country"
                                placeholder="Enter your country" 
                                id="country"
                                type="text"
                                error={errors?.country}
                                hideError={true}
                                register={register}
                                isDirty={dirtyFields?.country || getValues('country')}
                              />
                            )}
                          </td>
                        </tr>
                        <tr className='bg-white'>
                          <th className='px-4 py-6 text-left font-heading font-normal text-base' data-column="1">Timezone:</th>
                          <td className='px-4 py-6 text-left font-heading font-bold text-base w-full' data-column="2">
                            {!editMode ? (
                              <>
                                {user.timezone}
                              </>
                            ) : (
                              <TimezoneSelect 
                                placeholder="Select a timezone" 
                                name="timezone"
                                id="timezone"
                                control={control}
                                register={register}
                                hideError={true}
                                error={errors?.timezone}
                                isDirty={dirtyFields.timezone || getValues('timezone')}
                              >
                              </TimezoneSelect> 
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='flex flex-col items-center gap-2'>
                    {errors?.name && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.name.message}</p>}
                    {errors?.email && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.email.message}</p>}
                    {errors?.phone && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.phone.message}</p>}
                    {errors?.city && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.city.message}</p>}
                    {errors?.country && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.country.message}</p>}
                    {errors?.timezone && <p className='flex items-center rounded-md bg-error-100 py-2 px-4 font-heading text-sm text-error-400'>{errors.timezone.message}</p>}
                  </div>

                  {editMode && (
                    <div className='flex justify-end gap-2'>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          setEditMode(false)
                          reset(user)
                        }} 
                        className='bg-grey-400 hover:bg-grey-500 text-primary font-normal font-heading py-3 px-3 rounded'
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className='bg-secondary hover:bg-secondary-500 text-white font-normal font-heading py-3 px-3 rounded'
                      >
                        Save changes
                      </button>
                    </div>

                  )}

       
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>
        <div>{JSON.stringify(errors)}</div>
        <div>{isValid.toString()}</div> */}
                </Form>
              )}
            </div>
          
          </LayoutSidebar>



          {/* {error ? (
            <div>oops... {error.message}</div>
          ) : data === undefined ? (
            <div>Loading... </div>
          ) : (
            <div>{JSON.stringify(data)}</div>
          )} */}
        </Layout>
      </>
    )
  }
  return (
    <p>You must be signed in to access this page.</p>
  )
}

AccountSettings.auth = true